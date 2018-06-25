let converters = {
  convertBytes: (bytes) => {
    if (bytes == undefined)
      return '';
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes < 1024 * 1024 * 1024) {
      return (bytes / 1024 / 1024).toFixed(2) + " MB";
    } else if (bytes < 1024 * 1024 * 1024 * 1024) {
      return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
    } else {
      return (bytes / 1024 / 1024 / 1024 / 1024).toFixed(2) + " TB";
    }
  },
  toBytes: (str) => {
    if (str === undefined) {
      return "0";
    }
    var res = str.split(" ");
    if (res.length === 1) {
      // assume a number in GB
      return parseInt(str, 10) * 1024 * 1024 * 1024;
    }
    // assume first string is a number and second string is a unit of size
    if (res[1] === "KB") {
      return parseInt(res[0], 10) * 1024;
    }
    if (res[1] === "MB") {
      return parseInt(res[0], 10) * 1024 * 1024;
    }
    if (res[1] === "GB") {
      return parseInt(res[0], 10) * 1024 * 1024 * 1024;
    }
    if (res[1] === "TB") {
      return parseInt(res[0], 10) * 1024 * 1024 * 1024 * 1024;
    }
    // assume GB
    return parseInt(res[0], 10) * 1024 * 1024 * 1024;
  },
  convertHz: function (hz) {
    if (hz == null)
      return "";

    if (hz < 1000) {
      return hz + " MHz";
    } else {
      return (hz / 1000).toFixed(2) + " GHz";
    }
  },
}
export { converters }