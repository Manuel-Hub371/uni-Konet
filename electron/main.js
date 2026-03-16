const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "UniKonet Admin Dashboard"
  });

  // In production, load the built index.html
  // In development, load the vite dev server
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    // This will be used when we build the react app
    // win.loadFile(path.join(__dirname, '../admin-dashboard/dist/index.html'));
    win.loadURL('http://localhost:5173'); // Default for now
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
