const fs = require('fs');
const re = /[e_]\(\"(.*?)\"/gmi;

const tpl =
`msgid "{msgid}"
msgstr ""

`

fs.readFile('./tpl.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let matches = data.match(re).map(e => e.replace(re, '$1'));
    let exported = matches.map(e =>tpl.replace('{msgid}',e));
    console.log(exported.join(''));
});
