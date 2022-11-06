    const limitAndOffset = (limit, offset, data) => {
        if (limit && offset) {
        return data.filter((item) => item.id >= limit && item.id <= offset);
        } 
        if (limit) {
        return data.filter((item) => item.id >= limit);
        }
        if (offset) {
        return data.filter((item) => item.id <= offset);
        }
        return data;
    };
    
    module.exports = {
        limitAndOffset,
    };
    