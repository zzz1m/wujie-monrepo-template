import Node from './node';
import { getNodeKey } from './utils';

export default class CascaderStore {
  constructor(options) {
    this.currentNode = null;
    this.currentNodeKey = null;
    // 初始化配置
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
    // 节点映射配置
    this.nodesMap = {};

    this.root = new Node({
      data: this.data,
      store: this
    });
    // 配置数据懒加载
    if (this.lazy && this.load) {
      const loadFn = this.load;
      loadFn(this.root, (data) => {
        this.root.doCreateChildren(data);
        this._initDefaultCheckedNodes();
      });
    } else {
      this._initDefaultCheckedNodes();
    }
  }
  // 注册节点
  registerNode(node) {
    const key = this.nodeKey;
    if (!key || !node || !node.data) return;

    const nodeKey = node.nodeKey;
    if (nodeKey !== undefined) this.nodesMap[node.nodeKey] = node;
  }
  deregisterNode(node) {
    const key = this.nodeKey;
    if (!key || !node || !node.data) return;
    node.childNodes.forEach((child) => {
      this.deregisterNode(child);
    });
    delete this.nodesMap[node.nodeKey];
  }

  // 初始化选中信息
  _initDefaultCheckedNodes() {
    const defaultCheckedKeys = this.defaultCheckedKeys || [];
    const nodesMap = this.nodesMap;
    defaultCheckedKeys.forEach((checkedKey) => {
      const node = nodesMap[checkedKey];
      if (node) {
        node.setChecked(true);
      }
    });
  }
  // 选中单个节点
  _initDefaultCheckedNode(node) {
    const defaultCheckedKeys = this.defaultCheckedKeys || [];
    if (defaultCheckedKeys.indexOf(node.nodeKey) !== -1) {
      node.setChecked(true);
    }
  }
  setCurrentNode(currentNode) {
    const prevCurrentNode = this.currentNode;
    if (prevCurrentNode) {
      prevCurrentNode.isCurrent = false;
    }
    this.currentNode = currentNode;
    this.currentNode.isCurrent = true;
  }

  getNode(data) {
    if (data instanceof Node) return data;
    const key = typeof data !== 'object' ? data : getNodeKey(this.nodeKey, data);
    return this.nodesMap[key] || null;
  }

  remove(data) {
    const node = this.getNode(data);
    if (node && node.parent) {
      if (node === this.currentNode) {
        this.currentNode = null;
      }
      node.parent.removeChild(node);
    }
  }

  // 获取所有选中的信息
  getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
    const checkedNodes = [];
    const traverse = function (node) {
      const childNodes = node.root ? node.root.childNodes : node.childNodes;
      childNodes.forEach((child) => {
        if (child.checked && (!leafOnly || (leafOnly && child.isLeaf))) {
          checkedNodes.push(child.data);
        }
        traverse(child);
      });
    };

    traverse(this);

    return checkedNodes;
  }

  getCheckedKeys(leafOnly = false) {
    return this.getCheckedNodes(leafOnly).map((data) => (data || {})[this.nodeKey]);
  }
}
