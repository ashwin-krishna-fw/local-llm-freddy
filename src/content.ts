import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://support.freshdesk.com/*"]
}

// Runs when the page is fully loaded
window.addEventListener("load", () => {
  console.log(
    "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
  )
})



const configMapper = {
    // "https://support.freshdesk.com/a/tickets/*": {
      featureName: "Rephase with context",
      prompt: "Rephrase the selected text with context",
      classNameForContext: ["sentiment-ticket-heading","ticket_note"],
      idNameForContext: ["ticket_original_request"],
    // }
  }


// export const config: PlasmoCSConfig = {
//   matches: ["<all_urls>"]
// }

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractInnerText") {
    const selectedText = window.getSelection()?.toString().trim()

    if (!selectedText) {
      sendResponse({ error: "No text selected" })
      return
    }

    let data = '';

    configMapper.classNameForContext.forEach((className) => {
        document.querySelectorAll(`.${className}`).forEach((element) => {
            data += element.innerText.replace(/\s+/g, " ") // Normalize whitespace
            .slice(0, 1000) ;
        });
    });

    configMapper.idNameForContext.forEach((idName) => {
        const element = document.getElementById(idName);
        if (element) {
            data += element.innerText.replace(/\s+/g, " ") // Normalize whitespace
            .slice(0, 1000) ;
        }
    });

    console.log('data==>',data);

 
    // Extract innerText of surrounding elements to provide context
    const surroundingText = data// Limit length for efficiency

    sendResponse({ selectedText, surroundingText })
  }
})
