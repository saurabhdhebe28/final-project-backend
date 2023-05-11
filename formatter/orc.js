module.exports = class orcFormatter {
    ocrFileData(file, body) {
        let data = {}
        data['file'] = file? file.file : ''
        data['htmlTemplate'] = body.htmlTemplate
        return data
    }
}