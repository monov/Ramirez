let requestCount = {};
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeBackgroundColor({ color: '#3AEA62' });
});

chrome.webRequest.onCompleted.addListener(
  (details) => {
    const tabId = details.tabId;
    const statusCode = details.statusCode;
    if (tabId >= 0 && (statusCode >= 200 && statusCode < 300)) {
      if (!requestCount[tabId]) {
        requestCount[tabId] = 0;
      }
      requestCount[tabId]++;
      chrome.action.setBadgeText({
        tabId: tabId,
        text: requestCount[tabId].toString(),
      });
    }
  },
  { urls: ["<all_urls>"] },
);

chrome.tabs.onActivated.addListener((activeInfo) => {
  const tabId = activeInfo.tabId;
  chrome.action.setBadgeText({
    tabId: tabId,
    text: requestCount[tabId] ? requestCount[tabId].toString() : "0",
  });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete requestCount[tabId];
});
