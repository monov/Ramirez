document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTabId = tabs[0].id;
    chrome.action.getBadgeText({ tabId: activeTabId }, (result) => {
      document.getElementById("requestCount").textContent = result || "0";
    });
  });
});
