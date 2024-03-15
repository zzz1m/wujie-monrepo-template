export default {
  computed: {
    optionsKeys() {
      return (this.pathOptions && Object.keys(this.pathOptions)) || [];
    },
    urlQuery() {
      let res = {};
      this.optionsKeys.forEach((key) => {
        const keyName = typeof this.pathOptions[key] === 'object' ? this.pathOptions[key].key : this.pathOptions[key];
        res[key] = this[keyName];
      });
      return res;
    }
  },
  watch: {
    urlQuery: {
      handler: function (val) {
        this._pathChange(val);
      },
      deep: true
    }
    // '$route.query':{
    //     handler: function(val) {
    //         const list = this.$route.path.split('/');
    //         if(list[list.length -1] !== this.pathName) {
    //             return;
    //         }
    //         Object.keys(val || {})?.forEach(key => {
    //             if(this.optionsKeys.includes(key)) {
    //                 const isObj = typeof this.pathOptions[key] === 'object';
    //                 const keyName = isObj ? this.pathOptions[key].key: this.pathOptions[key];
    //                 this[keyName] = isObj && this.pathOptions[key].formatter? this.pathOptions[key].formatter(val[key]): val[key];
    //             }
    //         });
    //     },
    //     immediate:true,
    // },
  },
  mounted() {
    const { query } = this.$router.history.current;
    const keys = Object.keys(query || {});
    let hasNoKey = true;
    keys.forEach((key) => {
      if (this.optionsKeys.includes(key)) {
        hasNoKey = false;
        const isObj = typeof this.pathOptions[key] === 'object';
        const keyName = isObj ? this.pathOptions[key].key : this.pathOptions[key];
        this[keyName] = isObj && this.pathOptions[key].formatter ? this.pathOptions[key].formatter(query[key]) : query[key];
      }
    });
    if (hasNoKey) {
      const keyVals = {};
      this.optionsKeys.forEach((key) => {
        const isObj = typeof this.pathOptions[key] === 'object';
        const keyName = isObj ? this.pathOptions[key].key : this.pathOptions[key];
        keyVals[key] = this[keyName];
      });
      this.setQuery(keyVals);
    }
  },
  methods: {
    setQuery(params) {
      this._pathChange.call(this, params);
    },
    _pathChange(val) {
      const { query, path } = this.$router.history.current;
      let newQuery = JSON.parse(JSON.stringify(query));
      newQuery = Object.assign({}, newQuery, val);
      this.$router.replace({ path, query: newQuery });
    }
  }
};
