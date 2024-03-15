import { markNodeData, objectAssign } from './utils';


const getPropertyFromData = function(node, prop) {
    const props = node.store.props;
    const data = node.data || {};
    const config = props[prop];
    if (typeof config === 'function') {
        return config(data, node);
    } else if (typeof config === 'string') {
        return data[config];
    } else if (typeof config === 'undefined') {
        const dataProp = data[prop];
        return dataProp === undefined ? '' : dataProp;
    }
};

let nodeIdSeed = 0;

export default class Node {
    constructor(options) {
        this.id = nodeIdSeed++;
        this.text = null;
        this.checked = false;
        this.visible = true;
        this.expanded = false;
        this.data = null;
        this.parent = null;
        this.isCurrent = false;
        // 初始化配置
        for(let key in options){
            if( options.hasOwnProperty(key) ){
                this[key] = options[key];
            }
        }

        this.level = 0;
        this.loaded = false;
        this.loading = false;
        this.childNodes = [];

        if( this.parent ){
            this.level = this.parent.level + 1;
        }
        const store = this.store;
        if (!store) {
            throw new Error('[Node]store is required!');
        }
        store.registerNode(this);

        // 处理叶子节点
        const props = store.props;
        if (props && typeof props.isLeaf !== 'undefined') {
            const isLeaf = getPropertyFromData(this, 'isLeaf');
            if (typeof isLeaf === 'boolean') {
                this.isLeafByUser = isLeaf;
            }
        }
        // 渲染数据
        if (store.lazy !== true && this.data) {
            this.setData(this.data);
        }
        if (!Array.isArray(this.data)) {
            markNodeData(this, this.data);
        }
        if (!this.data) return;

        // 处理当前节点
        const key = store.nodeKey;
        if (key && store.currentNodeKey !== undefined && this.nodeKey === store.currentNodeKey) {
            store.currentNode = this;
            store.currentNode.isCurrent = true;
        }
    
        if (store.lazy) {
            store._initDefaultCheckedNode(this);
        }
    
        this.updateLeafState();
    }
    doCreateChildren(array, defaultProps = {}) {
        array.forEach((item) => {
            this.insertChild( objectAssign({ data: item }, defaultProps), undefined, true );
        });
    }

    setData(data) {
        if (!Array.isArray(data)) {
            markNodeData(this, data);
        }
    
        this.data = data;
        this.childNodes = [];
    
        let children;
        if (this.level === 0 && this.data instanceof Array) {
            children = this.data;
        } else {
            children = getPropertyFromData(this, 'children') || [];
        }
    
        for (let i = 0, j = children.length; i < j; i++) {
            this.insertChild({ data: children[i] });
        }
    }

    setChecked(value, deep = false) {
        const checked = value === true;
        this.checked = checked;

        const handleDescendants = () => {
            if( !deep ) return;
            const childNodes = this.childNodes;
            for (let i = 0, j = childNodes.length; i < j; i++) {
                const child = childNodes[i];
                child.setChecked(checked, deep);
            }
        };

        handleDescendants();
    }

    updateLeafState() {
        if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
            this.isLeaf = this.isLeafByUser;
            return;
        }
        const childNodes = this.childNodes;
        if (!this.store.lazy || (this.store.lazy === true && this.loaded === true)) {
            this.isLeaf = !childNodes || childNodes.length === 0;
            return;
        }
        this.isLeaf = false;
    }

    insertChild(child, index, batch) {
        if (!child) throw new Error('insertChild error: child is required.');
    
        if ( !(child instanceof Node) ) {
            if ( !batch ) {
                const children = this.getChildren(true);
                if (children.indexOf(child.data) === -1) {
                    if (typeof index === 'undefined' || index < 0) {
                        children.push(child.data);
                    } else {
                        children.splice(index, 0, child.data);
                    }
                }
            }
            objectAssign(child, {
                parent: this,
                store: this.store
            });
            child = new Node(child);
        }
    
        child.level = this.level + 1;
    
        if (typeof index === 'undefined' || index < 0) {
            this.childNodes.push(child);
        } else {
            this.childNodes.splice(index, 0, child);
        }
    
        this.updateLeafState();
    }

    remove() {
        const parent = this.parent;
        if (parent) {
            parent.removeChild(this);
        }
    }
    removeChild(child) {
        const children = this.getChildren() || [];
        const dataIndex = children.indexOf(child.data);
        if (dataIndex > -1) {
            children.splice(dataIndex, 1);
        }
    
        const index = this.childNodes.indexOf(child);
    
        if (index > -1) {
            this.store && this.store.deregisterNode(child);
            child.parent = null;
            this.childNodes.splice(index, 1);
        }
    
        // this.updateLeafState();
    }

    getChildren(forceInit = false) { 
        if (this.level === 0) return this.data;
        const data = this.data;
        if (!data) return null;
    
        const props = this.store.props;
        let children = 'children';
        if (props) {
            children = props.children || 'children';
        }
    
        if (data[children] === undefined) {
            data[children] = null;
        }
    
        if (forceInit && !data[children]) {
            data[children] = [];
        }
    
        return data[children];
    }

    expand(callback) {
        const done = () => {
            this.expanded = true;
            callback && callback();
        };
    
        if (this.shouldLoadData()) {
            this.loadData((data) => {
                if (data instanceof Array) {
                    done();
                }
            }, { visible: true });
        } else {
            done();
            this.childNodes.forEach(node => {
                node.visible = true;
            });
        }
    }

    loadData(callback, defaultProps = {}) {
        if (this.store.lazy === true && this.store.load && !this.loaded 
                && (!this.loading || Object.keys(defaultProps).length)) {
            this.loading = true;
            const resolve = (children) => {
                this.loaded = true;
                this.loading = false;
                this.childNodes = [];
        
                this.doCreateChildren(children, defaultProps);
        
                this.updateLeafState();
                callback && callback.call(this, children);
            };
    
            this.store.load(this, resolve);
        } else {
            callback && callback.call(this);
        }
    }

    shouldLoadData() {
        return this.store.lazy === true && this.store.load && !this.loaded;
    }

    get nodeKey() {
        const nodeKey = this.store.nodeKey;
        if (this.data) return this.data[nodeKey];
        return null;
    }

    get label() {
        return getPropertyFromData(this, 'label');
    }

    get disabled() {
        return getPropertyFromData(this, 'disabled');
    }

    get previousSibling() {
        const parent = this.parent;
        if (parent) {
            const index = parent.childNodes.indexOf(this);
            if (index > 0) {
                return parent.childNodes[index - 1];
            }
        }
        return null;
    }
    get nextSibling() {
        const parent = this.parent;
        if (parent) {
            const index = parent.childNodes.indexOf(this);
            const total = parent.childNodes.length;
            if (index > -1 && index < total -1) {
                return parent.childNodes[index + 1];
            }
        }
        return null;
    }
    get siblings() {
        const parent = this.parent;
        if( parent ){
            return parent.childNodes.filter(item => item !== this);
        }
        return [];
    }
};