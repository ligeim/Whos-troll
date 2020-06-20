const path = require("path")

const { app, BrowserWindow } = require("electron")
const isDev = require("electron-is-dev")

let win

function createWindow() {
    win = new BrowserWindow({
        width: 1500,
        height: 900,
        minWidth: 1152,
        minHeight: 780,
        webPreferences: { webSecurity: false, nodeIntegration: true },
    })
    win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`)

    win.on("closed", () => {
        win = null
    })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (win === null) {
        createWindow()
    }
})

if (isDev) app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors")
