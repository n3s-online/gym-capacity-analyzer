export const getFullDateString = (date: Date) => {
    const dateStringInPst = date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    return dateStringInPst;
}

export const getDateHhMm = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });