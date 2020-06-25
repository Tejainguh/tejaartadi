const electron = require("electron");
const { v4 : uuidv4 } = require('uuid');
uuidv4();
const fs = require ('fs')
const {app, BrowserWindow, Menu, ipcMain} = electron;

let homeWindow;
let dataWindow;
let data2Window;
let data3Window;
let riwayatWindow;
let riwayat2Window;

let allRiwayat = [];
let allRiwayat2 = [];

fs.readFile("db.json", (err, jsondata2) => {
    if(!err){
        const oldApp = JSON.parse(jsondata2);
        allRiwayat2 = oldApp;
    }
});

app.on("ready",  () => {
    homeWindow = new BrowserWindow({
       webPreferences : {
           nodeIntegration : true
        },
        title : "Aplikasi"  
    });

    homeWindow.loadURL(`file://${__dirname}/home.html`);
    homeWindow.on("closed", () => {

        const jsonApp = JSON.stringify(allRiwayat2);
        fs.writeFileSync("db.json", jsonApp);
        
        app.quit();
        homeWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

const dataWindowCreator = () => {
    dataWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 700,
        height: 550,
        title: "Konverter"
    });
    dataWindow.setMenu(null);
    dataWindow.loadURL(`file://${__dirname}/data.html`);
    dataWindow.on ("closed", () => (dataWindow = null))
};

const data2WindowCreator = () => {
    data2Window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 353,
        height: 575,
        title: "Calculator"
    });
    data2Window.setMenu(null);
    data2Window.loadURL(`file://${__dirname}/data2.html`);
    data2Window.on ("closed", () => (data2Window = null))
};

const riwayatWindowCreator = () => {
    riwayatWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 300,
        height: 500,
        title: "Riwayat"
    });
    riwayatWindow.setMenu(null);
    riwayatWindow.loadURL(`file://${__dirname}/riwayat.html`);
    riwayatWindow.on ("closed", () => (riwayatWindow = null))
};

const data3WindowCreator = () => {
    data3Window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 800,
        height: 600,
        title: "Calculator"
    });
    data3Window.setMenu(null);
    data3Window.loadURL(`file://${__dirname}/data3.html`);
    data3Window.on ("closed", () => (data3Window = null))
};

const riwayat2WindowCreator = () => {
    riwayat2Window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 300,
        height: 500,
        title: "Riwayat"
    });
    riwayat2Window.setMenu(null);
    riwayat2Window.loadURL(`file://${__dirname}/riwayat2.html`);
    riwayat2Window.on ("closed", () => (riwayat2Window = null))
};

ipcMain.on("data_suhu:data", (event, data1)=>{
    data1["id"] = uuidv4();
    data1["done"] = 0;
    allRiwayat.push(data1);
    
    dataWindow.close();
    console.log (allRiwayat);
});
ipcMain.on("data1:request:riwayat", event =>{
    riwayatWindow.webContents.send('data1:response:riwayat',allRiwayat);
});

ipcMain.on("data_rumus:data", (event, data2)=>{
    data2["id"] = uuidv4();
    data2["done"] = 0;
    allRiwayat2.push(data2);
    
    data3Window.close();
    console.log (allRiwayat2);
});
ipcMain.on("data2:request:riwayat2", event =>{
    riwayat2Window.webContents.send('data2:response:riwayat2',allRiwayat2);
});

const menuTemplate = [
    {
        label : "File |",
        submenu : [
            {
                label: "Quit",
                accelerato : process.platform === "darwin" ? "Command+Q" :
                "Ctrl+Q",
                click(){
                    app.quit(); 
                }
            }
        ]
    },
    {
        label: "Konverter Suhu |",
        submenu : [
            {
                label : "Konverter Suhu",
                click(){
                    dataWindowCreator();
                }
            },
            {
                label : "Riwayat",
                click(){
                    riwayatWindowCreator();
                }
            },
        ]
    },
    {
        label: "Simple Calculator |",
        submenu : [
            {
                label : "Simple Calculator",
                click(){
                    data2WindowCreator();
                }
            },
        ]
    },
    {
        label: "KJW Konverter |",
        submenu : [
            {
                label : "Konverter",
                click(){
                    data3WindowCreator();
                }
            },
            {
                label : "Riwayat",
                click(){
                    riwayat2WindowCreator();
                }
            },
        ]
    },
];