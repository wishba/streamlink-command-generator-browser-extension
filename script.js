document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTab = tabs[0];
    let title = currentTab.title;

    title = title.replace(/[\/\\:*?"<>|]/g, ' ');

    title = title.trim().replace(/\s+/g, ' ');

    title = title.replace(/\s-\sYouTube$/, '');

    document.getElementById("pageTitle").textContent = title;

    let copyButton = document.getElementById("copyButton");

    copyButton.addEventListener("click", function () {
      let streamlinkCommand = `streamlink ${currentTab.url} best -o "D:\\download stream\\${title}.avi"`;

      let tempInput = document.createElement("input");
      tempInput.value = streamlinkCommand;

      document.body.appendChild(tempInput);

      tempInput.select();
      document.execCommand("copy");

      document.body.removeChild(tempInput);

      copyButton.textContent = "Copied!";
      setTimeout(function () {
        copyButton.textContent = "Copy Command";
      }, 2000);
    });
  });
});