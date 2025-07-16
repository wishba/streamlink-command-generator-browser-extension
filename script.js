document.addEventListener("DOMContentLoaded", function () {
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let title = tabs[0].title
    title = title.replace(/^\(\d+\)\s*/, "").replace(/[<>:"|?*\/\\]/g, "")
    document.getElementById("title").innerText = title

    let copyBtn = document.getElementById("generate")
    copyBtn.addEventListener("click", (e) => {
      e.preventDefault()

      let resolution = document.getElementById("resolution").value
      let location = document.getElementById("location").value

      let command = `streamlink ${tabs[0].url} ${resolution} -o "${location}${title}.ts"`

      navigator.clipboard.writeText(command)

      copyBtn.innerText = "Copied!";
      setTimeout(function () {
        copyBtn.innerText = "Copy Command";
      }, 2000);

      document.getElementById("command").innerHTML = `Generated Command: <br> ${command}`
    })
  })
}) 
