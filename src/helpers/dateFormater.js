export const formatDate = (dateStr)=> {
    const date = new Date(dateStr);
    const day = date.getDate();
    // Handling 'st', 'nd', 'rd', 'th'
    const daySuffix = (d) => 
        d > 3 && d < 21 ? 'th' : 
        ['st', 'nd', 'rd'][((d % 10) - 1)] || 'th';
    const month = date.toLocaleString('default', { month: 'short' }); // 'Aug'
    const year = date.getFullYear();
    return `${day}${daySuffix(day)}-${month}, ${year}`;
}