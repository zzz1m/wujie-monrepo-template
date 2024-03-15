const fileMimeType = {
  image: ['.jpg', '.png', '.jpeg'],
  pdf: ['.pdf'],
  ppt: ['.ppt', '.pptx'],
  excel: ['.xlsx', '.xls'],
  word: ['.doc', '.docx'],
  video: ['.wmv', '.avi', '.mpg', '.mpeg', '.3gp', '.mov', '.mp4', '.flv', '.f4v', '.m4v', '.m2t', '.mts', '.rmvb', '.vob', '.mkv']
};
export const getFileType = function (name) {
  if(name.indexOf('.') === -1) {
    return 'video';
  }
  let nameArr = (name || '').split('.');
  let type = nameArr[nameArr.length - 1].toLowerCase();
  const keys = Object.keys(fileMimeType);

  for(let i = 0; i < keys.length; i++) {
    const list = fileMimeType[keys[i]];
    if(list.includes('.'+type)) {
      return keys[i];
    }
  }
  return '';
};

export const getIconName = function (name) {
  return 'icon-' + getFileType(name || 'other');
};
