function openWebview(url) {
  if (url.indexOf('h5://') >= 0) {
    window
      .HWH5
      .openWebview({ uri: url });
    return;
  }
  // console.log(`${window.location.origin}${window.location.pathname}#${url}`);
  // window.location.href = `${window.location.origin}${window.location.pathname}#${url}`;
  window.location.hash = url;
}

export default openWebview;
