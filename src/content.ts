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



const congifMapper = {
    "https://support.freshdesk.com/a/tickets/*": {
      featureName: "Rephase with context",
      prompt: "Rephrase the selected text with context",
      classNameForContext: ["sentiment-ticket-heading"],
    }
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

    console.log('selectedText',selectedText);
 
    // Extract innerText of surrounding elements to provide context
    const surroundingText = document.body.innerText
      .replace(/\s+/g, " ") // Normalize whitespace
      .slice(0, 1000) // Limit length for efficiency

    sendResponse({ selectedText, surroundingText })
  }
})
