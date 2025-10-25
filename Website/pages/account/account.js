/**
 * Link download button to download anchor element
 * @param {Account} account | account object with data to link to dowload button
 */
async function linkDownloadButton(account)
{
    const downloadAnchor = document.querySelector('#download-button')
    const key = account.name + account.password
    
    // Encrypt account and prepare it for download
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(account), key);
    const encryptedBlob = new Blob([encrypted], {type: "text/plain"});

    // Get link to readable account file and attach it to anchor
    // as it's link
    const fileURL = URL.createObjectURL(encryptedBlob);
    downloadAnchor.href = fileURL;
}

/**
 * Clear user data and return to home page
 * @param {Account} account account to clear from storage
 */
async function clearStorage(account)
{
    await account.clearStorage();
    window.location.href = "/";
}


/**
 * Main function, controls scope of page elements
 */
async function main()
{
    let account = new Account();
    await account.loadFromStorage();

    const clearDataButton = document.querySelector('#clear-data')
    
    clearDataButton.addEventListener('click', function()
    {
        clearStorage(account)
    });

    linkDownloadButton(account);
}

main();