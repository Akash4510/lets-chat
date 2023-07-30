export function fDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day} ${getMonthName(date)} ${year}`;
}

export function fDateTime(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${getMonthName(date)} ${year} ${hours}:${minutes}`;
}

export function fTimestamp(date) {
  return date.getTime();
}

export function fDateTimeSuffix(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

export function fToNow(date) {
  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return 'Just now';
  }

  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 7) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  return fDate(date);
}

export function fCustomDateTime(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDate(date, today)) {
    return formatTime(date);
  } else if (isSameDate(date, yesterday)) {
    return 'Yesterday';
  } else {
    return formatDate(date);
  }
}

export function formatOnlyTime(timestamp) {
  const date = new Date(timestamp);
  return formatTime(date);
}

// Helper function to check if two dates have the same day, month, and year
function isSameDate(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

// Helper function to format time in 'hh:mm A' format
function formatTime(date) {
  const hours = (date.getHours() % 12 || 12).toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${hours}:${minutes} ${ampm}`;
}

// Helper function to format date in 'dd/mm/yy' format
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

// Helper function to get the month name from the date
function getMonthName(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[date.getMonth()];
}
