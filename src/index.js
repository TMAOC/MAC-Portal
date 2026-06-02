        '<div style="font-size:12px">No dates found for this filter.</div>' +
      '</div>';
    return;
  }

  var html = '';
  filtered.forEach(function(event) {
    var dateInfo = formatCalendarDate(event.date, event.endDate);
    html +=
      '<div class="calendar-card ' + escapeHtml(event.type || 'calendar') + '">' +
        '<div class="calendar-date-box">' +
          '<div class="calendar-month">' + escapeHtml(dateInfo.month) + '</div>' +
          '<div class="calendar-day">' + escapeHtml(dateInfo.day) + '</div>' +
        '</div>' +
        '<div class="calendar-info">' +
          '<div class="calendar-title">' + escapeHtml(event.title || 'Calendar Date') + '</div>' +
          '<div class="calendar-notes">' + escapeHtml(dateInfo.full) + '</div>' +
          '<span class="calendar-tag">' + escapeHtml(labelCalendarType(event.type)) + '</span>' +
        '</div>' +
      '</div>';
  });

  container.innerHTML = html;
}

function formatCalendarDate(startDate, endDate) {
  var start = parseLocalDate(startDate);
  var end = endDate ? parseLocalDate(endDate) : null;

  if (!start) return { month: '', day: '', full: startDate || '' };

  var month = start.toLocaleDateString('en-US', { month: 'short' });
  var day = String(start.getDate());

  var full = start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  if (end) {
    full += ' - ' + end.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  return { month: month, day: day, full: full };
}

function parseLocalDate(value) {
  if (!value) return null;
  var parts = String(value).split('-');
  if (parts.length !== 3) return null;
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function labelCalendarType(type) {
  var labels = {
    event: 'Event',
    break: 'Seasonal Break',
    professional_learning: 'Professional Learning',
    holiday: 'Holiday',
    half_day: 'Early Dismissal',
    milestone: 'First / Last Day',
    calendar: 'Calendar'
  };

  return labels[type] || type || 'Calendar';
}

function getActivityDate(item) {
  var rawDate = item.date || item.created_at || item.createdAt || item.observed_on || item.observedOn || item.updated_at || '';

  if (!rawDate) return '';

  var parsedDate = new Date(rawDate);
  if (isNaN(parsedDate.getTime())) return String(rawDate);

  return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getActivityTitle(item) {
  return item.title || item.lesson_name || item.lessonName || item.name || item.activity_name || '';
}

function getActivityText(item) {
  return item.text || item.note || item.notes || item.description || item.body || item.comment || item.comments || item.observation || item.observations || item.caption || item.message || '';
}

function getActivityType(item) {
  var type = item.type || item.kind || item.category || item.activity_type || item.activityType || '';

  if (!type) {
    if (getActivityPhotos(item).length) return 'Photo';
    if (getActivityText(item)) return 'Note';
    return 'Activity';
  }

  return String(type).replace(/_/g, ' ');
}

function getActivityPhotos(item) {
  var photos = [];

  function addPhoto(value) {
    if (!value) return;

    if (typeof value === 'string') {
      if (value.indexOf('http') === 0) photos.push(value);
      return;
    }

    if (typeof value === 'object') {
      var possibleUrl =
        value.large_photo_url ||
        value.largePhotoUrl ||
        value.original_photo_url ||
        value.originalPhotoUrl ||
        value.full_photo_url ||
        value.fullPhotoUrl ||
        value.large_url ||
        value.largeUrl ||
        value.original_url ||
        value.originalUrl ||
        value.full_url ||
        value.fullUrl ||
        value.photo_url ||
        value.photoUrl ||
        value.image_url ||
        value.imageUrl ||
        value.url ||
        value.medium_url ||
        value.mediumUrl ||
        value.thumbnail_url ||
        value.thumbnailUrl;

      if (possibleUrl) addPhoto(possibleUrl);
    }
  }

  addPhoto(item.large_photo_url);
  addPhoto(item.largePhotoUrl);
  addPhoto(item.original_photo_url);
  addPhoto(item.originalPhotoUrl);
  addPhoto(item.full_photo_url);
  addPhoto(item.fullPhotoUrl);
  addPhoto(item.large_url);
  addPhoto(item.largeUrl);
  addPhoto(item.original_url);
  addPhoto(item.originalUrl);
  addPhoto(item.full_url);
  addPhoto(item.fullUrl);
  addPhoto(item.photo_url);
  addPhoto(item.photoUrl);
  addPhoto(item.image_url);
  addPhoto(item.imageUrl);
  addPhoto(item.url);
  addPhoto(item.photo);
  addPhoto(item.image);

  if (Array.isArray(item.photos)) item.photos.forEach(addPhoto);
  if (Array.isArray(item.images)) item.images.forEach(addPhoto);
  if (Array.isArray(item.attachments)) item.attachments.forEach(addPhoto);
  if (Array.isArray(item.media)) item.media.forEach(addPhoto);

  return Array.from(new Set(photos));
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').catch(function() {});
}

doConnect();

if (new URLSearchParams(window.location.search).get('signed_in') === '1') {
  window.history.replaceState({}, document.title, window.location.pathname);
}
</script>

</body>
</html>`;
}
