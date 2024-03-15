let observer = null;

const openObserver = function (targetNode, cb) {
  // 选择将观察突变的节点
  targetNode = (targetNode && typeof targetNode === 'string' ? document.querySelector(targetNode) : targetNode) || document.body;
  if (!window.MutationObserver) {
    const config = { attributes: false, childList: true, subtree: true };
    const callback = function (mutationsList = []) {
      cb && cb();
      // mutationsList.forEach(item => {
      // });
    };
    observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  } else if (targetNode.addEventListener && !window.XDomainRequest) {
    targetNode.addEventListener(
      'DOMSubtreeModified',
      (targetNode.callback = function (e) {
        cb && cb();
      })
    );
  } else {
    cb && cb();
  }
};

const removeObserver = function (targetNode, cb) {
  // 选择将观察突变的节点
  targetNode = (targetNode && typeof targetNode === 'string' ? document.querySelector(targetNode) : targetNode) || document.body;

  if (observer) {
    observer.disconnect();
    observer.takeRecords();
    observer = null;
  } else if (targetNode.removeEventListener && !window.XDomainRequest) {
    targetNode.removeEventListener('DOMSubtreeModified', targetNode.callback);
    targetNode.callback = null;
  }
  cb && cb();
};

export default {
  data() {
    return {
      observerEle: null
    };
  },
  beforeDestroy() {
    const eles = this.observerEle;
    if (Array.isArray(eles)) {
      eles.forEach((item) => {
        removeObserver(item, () => {
          this.setEditing(0);
        });
      });
    } else {
      removeObserver(eles, () => {
        this.setEditing(0);
      });
    }
  },
  methods: {
    openObserver(ele) {
      // 留给dom 1s 绘制的时间
      const obserTimer = setTimeout(() => {
        this.observerEle = ele;
        if (Array.isArray(ele)) {
          ele.forEach((item) => {
            openObserver(item, () => {
              this.setEditing(1);
            });
          });
        } else {
          openObserver(this.observerEle, () => {
            this.setEditing(1);
          });
        }
        clearTimeout(obserTimer);
      }, 1000);
    }
  }
};
