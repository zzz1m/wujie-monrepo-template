<template>
<div class="operation-record">
    <div class="time-line">
        <div v-for="(subItem,index) in data" :key="index" class="record-item">
            <p class="record-time">
                <svg-icon class="record-radio-style" icon-class="resume-record-icon" />
                <svg-icon class="record-triangle-top" icon-class="triangle-top" />
                <span class="record-tag">等级：{{ subItem.calss }}</span>
                <span class="record-tag">{{ $dayjs(subItem.addTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </p>
            <div class="record-conent">
                <div class="record-userinfo" style="display:flex">
                    <div class="record-tag" style="white-space: nowrap;">{{ subItem.addUserName }}</div>
                    <template v-if="subItem.reason && subItem.reason.length">
                        <div class="record-tag notag" style="white-space: nowrap;">校准理由：</div>
                        <div class="record-tag notag" style="white-space: pre-line;">{{ subItem.reason }}</div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
    props: ['data']
};
</script>

<style lang="less" scoped>
.operation-record {
    position: relative;
    padding-left: 22px;
    .record-time {
    line-height: 21px;
    position: relative;
    margin: 0 0 6px 0;
    .record-radio-style {
      position: absolute;
      width: 11px;
      left: -22px;
      top: 3px;
      
    }
    .record-triangle-top {
      position: absolute;
      width: 7px;
      left: -20px;
      top: 15px;
    }
  }
  .record-userinfo {
    line-height: 18px;
    .record-radio-style {
      position: absolute;
      width: 11px;
      left: -22px;
      top: 0px;
      
    }
    .record-triangle-top {
      position: absolute;
      width: 7px;
      left: -20px;
      top: 10px;
    }
  }
  .record-recommend {
    color: #666666;
    line-height: 20px;
    margin-bottom: 0;
  }
  .record-conent>div {
    margin: 0 0 6px 0;
  }
  .record-item>.record-conent {
    position: relative;
    margin-bottom: 0;
    padding-bottom: 6px;
    &:before {
      content: '';
      position: absolute;
      left: -18px;
      display: block;
      border-left: 3px #e5e6eb dotted;
      padding-bottom: 14px;
      margin-bottom: 0;
      top: 2px;
      bottom: 0;
      // transform: translateY(-50%);
    }
  }
  .record-item:last-child {
    .record-conent:before {
      display: none;
    }
    .record-triangle-top {
      display: none;
    }
  }
  .time-line {
    margin-bottom: 24px;
  }
  .time-line:last-child {
    margin-bottom: 0;
  }
  .record-tag {
    margin-right: 21px;
    display: inline-block;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      right: -10px;
      display: block;
      width: 1px;
      height: 10px;
      background: #E5E6EB;
      top: 5px;
    }
  }
  .notag {
    margin-right: 0px;
    &:after {
      content: '';
      display: none;
    }
  }
  .record-tag-new {
    margin-right: 21px;
    display: inline-block;
    position: relative;
  }
  .record-line {
    width: 1px;
    height: 10px;
    background: #E5E6EB;
  }
  .record-tag:last-child {
    &:after {
      display: none;
    }
  }
}

</style>
