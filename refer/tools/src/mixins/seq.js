import API from '../meta/api/index';
const { dictList, _getSpecialDictTypes } = API.COMMON;
// 获取序列，子序列，职级，标准岗位等之间的关系
export default {
  data() {
    return {
      seqList: [],
      seqSubList: [],
      seqLevelList: [],
      stdPositionList: [],
      manageSeqList: [],
      manageSeqSubList: [],
      manageSeqLevelList: [],
      manageStdPositionList: []
    };
  },
  created() {
    this.getSeqList();
    this.getManageSeqList();
  },
  methods: {
    // 获取所有序列数据
    async getSeqList() {
      const { success, root } = await dictList('seq');
      if (success && root) {
        this.seqList = root || [];
      }
    },
    // 获取管理序列下拉列表
    async getManageSeqList() {
      const { root } = await _getSpecialDictTypes({
        dictType: 'manage_seq',
        url: '/api/sys/dict/manageSeq/list.json'
      });
      this.manageSeqList = root || [];
    },
    // 获取下拉列表
    async getSpecialDict(parentCode, url, dictType = 'seq') {
      if (!parentCode) return [];
      const { success, root } = await _getSpecialDictTypes({
        dictType,
        url,
        parentCode
      });
      return root || [];
    },
    // 获取子序列
    async getSeqSubList(parentCode) {
      this.seqSubList = [];
      this.seqSubList = await this.getSpecialDict(parentCode, '/api/sys/dict/sub/list.json');
    },
    // 获取职级
    async getSeqLevelList(parentCode) {
      this.seqLevelList = [];
      this.seqLevelList = await this.getSpecialDict(parentCode, '/api/sys/dict/level/list.json');
    },
    // 获取标准岗位
    async getStdPositionList(parentCode) {
      this.stdPositionList = [];
      this.stdPositionList = await this.getSpecialDict(parentCode, '/api/sys/dict/position/list.json', 'seq_sub');
    },
    // 获取管理子序列
    async getManageSeqSubList(parentCode) {
      this.manageSeqSubList = [];
      this.manageSeqSubList = await this.getSpecialDict(parentCode, '/api/sys/dict/manageSub/list.json', 'manage_seq');
    },
    // 获取管理职级
    async getManageSeqLevelList(parentCode) {
      this.manageSeqLevelList = [];
      this.manageSeqLevelList = await this.getSpecialDict(parentCode, '/api/sys/dict/manageLevel/list.json', 'manage_seq');
    },
    // 获取管理标准岗位
    async getManageStdPositionList(parentCode) {
      this.manageStdPositionList = [];
      this.manageStdPositionList = await this.getSpecialDict(parentCode, '/api/sys/dict/managePosition/list.json', 'manage_seq_sub');
    }
  }
};
