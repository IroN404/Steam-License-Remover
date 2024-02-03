// ==UserScript==
    // @name         Steam License Remover
    // @namespace
    // @version      1.2
    // @description  Remove any "Free" games from your Steam Library by removing the game's license from your account.
    // @author       IroN404
    // @match        https://store.steampowered.com/account/licenses/


const removeLinkEls = document.querySelectorAll('.free_license_remove_link > a');
let itemIds = [];

removeLinkEls.forEach(el => itemIds.push(el.getAttribute('href').match(/\d+/)[0]));

const total = itemIds.length;
console.log(`Starting removal of ${total} entries`);
const start = Date.now();

let removed = 0;
const intervalId = setInterval(async () => {
    const currentId = itemIds.pop();
    const response = await fetch('https://store.steampowered.com/account/removelicense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `sessionid=${g_sessionID}&packageid=${currentId}`
    });
    if (!response.ok) console.error(response);

    removed++;

    if (!itemIds.length) {
        console.info(`All ${total} licenses removed!`);
        clearInterval(intervalId);
    } else {
        const now = Date.now();
        const remaining = Math.floor((now - start) / removed * (total - removed));
        console.info(`Removed ${removed} of ${total} licenses. ETA: ${new Date(now + remaining).toLocaleTimeString()}`);
    }
}, 2000);
