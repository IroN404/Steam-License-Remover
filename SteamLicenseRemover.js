// ==UserScript==
    // @name         Steam License Remover
    // @namespace
    // @version      1.1
    // @description  Remove any "Free" games from your Steam Library by removing the game's license from your account.  
    // @author       IroN404
    // @match        https://store.steampowered.com/account/licenses/


const table = document.querySelector('.account_table');
const rows = table.querySelectorAll('tr');
const total = rows.length;

let removed = 0;
const intervalId = setInterval(() => {
    rows.forEach(row => {
        const div = row.querySelector('.free_license_remove_link');
        if(div) {
            const removeLink = div.querySelector('a');
            if (removeLink) {
                removed += 1;
                const link = removeLink.getAttribute('href');
                const id = link.split('(')[1].split(',')[0].trim();
                jQuery.post(
                    'https://store.steampowered.com/account/removelicense',
                    {
                        sessionid: g_sessionID,
                        packageid: id
                    }
                );
            }
        }
    });

    if (removed === total) {
        console.log(`All ${total} licenses removed!`);
        clearInterval(intervalId);
    }
    if (removed < total) {
        console.log(`Removed ${removed} of ${total} licenses.`);
    }
}, 2000);
