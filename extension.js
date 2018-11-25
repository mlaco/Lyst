// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "lyst" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.lyst', function () {
        // The code you place here will be executed every time your command is executed

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let position = editor.selection.anchor
        let range = editor.document.getWordRangeAtPosition(position)
        let text = editor.document.getText(range)
        
        let bigRange = new vscode.Range(
            range.start.line, Math.max(range.start.character - 1, 0),
            range.end.line, range.end.character + 1
        )
        let nRange = editor.document.validateRange(bigRange)
        let bigText = editor.document.getText(nRange);

        if (bigText === ":open:") {
            editor.edit(eb => eb.replace(bigRange, "📋"))
        } else if (bigText === ":check:") {
            editor.edit(eb => eb.replace(bigRange, "✅"))
        } else if (text === "📋") {
            editor.edit(eb => eb.replace(range, "✅"))
        } else if (text === "✅") {
            editor.edit(eb => eb.replace(range, "📋"))
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;