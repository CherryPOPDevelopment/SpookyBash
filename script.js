document.getElementById('year').textContent = new Date().getFullYear();

const shareButton = document.getElementById('share-site');
const shareStatus = document.getElementById('share-status');

shareButton.addEventListener('click', async () => {
  const shareData = {
    title: document.title,
    text: "Join us for Lynn and Nathan's Halloween Bash!",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }

  try {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        shareStatus.textContent = 'Link copied! Ready to share.';
        return;
      } catch (error) {
        console.warn('Clipboard API unavailable; trying the compatibility copy method:', error);
      }
    }

    const linkInput = document.createElement('textarea');
    linkInput.value = shareData.url;
    linkInput.setAttribute('readonly', '');
    linkInput.style.position = 'absolute';
    linkInput.style.left = '-9999px';
    document.body.appendChild(linkInput);
    linkInput.select();
    const copied = document.execCommand('copy');
    linkInput.remove();
    if (!copied) throw new Error('Clipboard copy was not available.');

    shareStatus.textContent = 'Link copied! Ready to share.';
  } catch (error) {
    shareStatus.textContent = 'Unable to copy the link. Please copy it from your browser address bar.';
    console.error('Unable to share or copy the website link:', error);
  }
});
