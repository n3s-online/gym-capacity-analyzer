export const getFullDateString = (date: Date) => {
    const dateStringInPst = date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const withoutSeconds = dateStringInPst.substring(0, dateStringInPst.length - 6) + dateStringInPst.substring(dateStringInPst.length - 3);
    return withoutSeconds;
}

export const getDateHhMm = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });