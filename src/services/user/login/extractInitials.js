const userInitials = (userName) => {
    const initials = userName.split(' ').map(word => word[0].toUpperCase()).join('');
    return initials;
};

module.exports = userInitials;