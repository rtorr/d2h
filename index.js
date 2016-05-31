#!/usr/bin/env node
var diff2Html = require('diff2html').Diff2Html;
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var config = {
  inputFormat: 'json',
  outputFormat: 'side-by-side'
};

var container = function (body) {
  return `
      <html>
      <head>
        <style>
          .d2h-code-line-prefix,.line-num1{float:left}.d2h-wrapper{text-align:left}.d2h-file-header{padding:5px 10px;border-bottom:1px solid #d8d8d8;background-color:#f7f7f7}.d2h-file-stats{display:-webkit-box;display:-ms-flexbox;display:flex;margin-left:auto;font-size:14px}.d2h-lines-added{text-align:right;border:1px solid #b4e2b4;border-radius:5px 0 0 5px;color:#399839;padding:2px;vertical-align:middle}.d2h-lines-deleted{text-align:left;border:1px solid #e9aeae;border-radius:0 5px 5px 0;color:#c33;padding:2px;vertical-align:middle;margin-left:1px}.d2h-file-name-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;font-family:"Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:15px;line-height:15px}.d2h-file-name{line-height:33px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.d2h-file-diff,.d2h-file-side-diff{overflow-x:scroll;overflow-y:hidden}.d2h-file-wrapper{border:1px solid #ddd;border-radius:3px;margin-bottom:1em}.d2h-diff-table{width:100%;border-collapse:collapse;font-family:Menlo,Consolas,monospace;font-size:13px}.d2h-diff-tbody>tr>td>div{height:16px;line-height:16px}.d2h-files-diff{width:100%}.d2h-file-side-diff{display:inline-block;width:50%;margin-right:-4px}.d2h-code-line,.d2h-code-side-line{display:block;white-space:nowrap;padding:0 10px}.d2h-code-line{margin-left:80px}.d2h-code-side-line{height:18px;line-height:18px;margin-left:50px}.d2h-code-line del,.d2h-code-side-line del{display:inline-block;margin-top:-1px;text-decoration:none;background-color:#ffb6ba;border-radius:.2em}.d2h-code-line ins,.d2h-code-side-line ins{display:inline-block;margin-top:-1px;text-decoration:none;background-color:#97f295;border-radius:.2em}.d2h-code-line-ctn,.d2h-code-line-prefix{background:0 0;padding:0}.d2h-code-linenumber,.d2h-code-side-linenumber{position:absolute;height:18px;line-height:18px;background-color:#fff;text-align:right;color:rgba(0,0,0,.3);cursor:pointer}.line-num1,.line-num2{width:40px;padding-left:3px;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis}.line-num2{float:right}.d2h-code-linenumber{box-sizing:border-box;width:86px;padding-left:2px;padding-right:2px;border:solid #eee;border-width:0 1px}.d2h-code-side-linenumber{box-sizing:border-box;width:56px;padding-left:5px;padding-right:5px;border:solid #eee;border-width:0 1px;overflow:hidden;text-overflow:ellipsis}.d2h-del{background-color:#fee8e9;border-color:#e9aeae}.d2h-ins{background-color:#dfd;border-color:#b4e2b4}.d2h-info{background-color:#f8fafd;color:rgba(0,0,0,.3);border-color:#d5e4f2}.d2h-file-diff .d2h-del.d2h-change{background-color:#fdf2d0}.d2h-file-diff .d2h-ins.d2h-change{background-color:#ded}.d2h-file-list-wrapper{margin-bottom:10px}.d2h-file-list-wrapper a{text-decoration:none;color:#3572b0}.d2h-file-list-wrapper a:visited{color:#3572b0}.d2h-file-list-header{text-align:left}.d2h-file-list-title{font-weight:700}.d2h-file-list-line{display:-webkit-box;display:-ms-flexbox;display:flex;text-align:left}.d2h-file-list-line .d2h-file-name{line-height:21px}.d2h-file-list{display:block;list-style:none;padding:0;margin:0}.d2h-file-list>li{border-bottom:#ddd solid 1px;padding:5px 10px;margin:0}.d2h-file-list>li:last-child{border-bottom:none}.d2h-file-switch{display:none;font-size:10px;cursor:pointer}.d2h-icon-wrapper{line-height:31px}.d2h-icon{vertical-align:middle;margin-right:10px;fill:currentColor}.d2h-deleted{color:#c33}.d2h-added{color:#399839}.d2h-changed{color:#d0b44c}.d2h-moved{color:#3572b0}.d2h-tag{display:-webkit-box;display:-ms-flexbox;display:flex;font-size:10px;margin-left:5px;padding:0 2px;background-color:#fff}.d2h-deleted-tag{border:1px solid #c33}.d2h-added-tag{border:1px solid #399839}.d2h-changed-tag{border:1px solid #d0b44c}.d2h-moved-tag{border:1px solid #3572b0}.selecting-left .d2h-code-line,.selecting-left .d2h-code-line *,.selecting-left .d2h-code-side-line,.selecting-left .d2h-code-side-line *,.selecting-right td.d2h-code-linenumber,.selecting-right td.d2h-code-linenumber *,.selecting-right td.d2h-code-side-linenumber,.selecting-right td.d2h-code-side-linenumber *{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.selecting-left .d2h-code-line ::-moz-selection .selecting-right td.d2h-code-linenumber::-moz-selection,.selecting-left .d2h-code-line::-moz-selection,.selecting-left .d2h-code-side-line ::-moz-selection,.selecting-left .d2h-code-side-line::-moz-selection,.selecting-right td.d2h-code-side-linenumber ::-moz-selection,.selecting-right td.d2h-code-side-linenumber::-moz-selection{background:0 0}.selecting-left .d2h-code-line ::selection .selecting-right td.d2h-code-linenumber::selection,.selecting-left .d2h-code-line::selection,.selecting-left .d2h-code-side-line ::selection,.selecting-left .d2h-code-side-line::selection,.selecting-right td.d2h-code-side-linenumber ::selection,.selecting-right td.d2h-code-side-linenumber::selection{background:0 0}
        </style>        
      </head>
      <body>
        ${body}
      </body>
      </html>
    `;
};
fs.readFile(argv.f, 'utf8', (err, data) => {
  if (err) throw err;
  var json_data = diff2Html.getJsonFromDiff(data, config);
  console.log(`Writing html to ${argv.f}.html`);
  fs.writeFile(`${argv.f}.html`, container(diff2Html.getPrettyHtml(json_data, config)), (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });
});

