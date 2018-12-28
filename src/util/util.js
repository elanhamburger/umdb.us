const color = (id) => {
    const colors = {
        '115': '#EC6E2E',
        '116': '#782B90',
        '117': '#1C99D5',
        '118': '#FEC92D',
        '122': '#00AA4D'
    };

    return colors[id] || '#A8A9AD';
};

export { color };