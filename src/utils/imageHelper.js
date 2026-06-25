export const getImageUrl = (path) => {
    if (!path) return "/default-avatar.png";

    if (path.startsWith("http")) return path;

    return `https://office-management-backend-7kur.onrender.com${path}`;
};