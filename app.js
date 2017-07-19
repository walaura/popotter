const tpl =
`msgid "{msgid}"
msgstr "{str}"

`

module.exports = convert = strings => {

    if(!strings) {
        throw new Error('Missing strings');
    }

    let exported = [];
    for (let i in strings) {
        exported.push(
            (tpl+'').replace('{msgid}',i).replace('{str}',strings[i])
        )
    }
    return exported.join('');

}
