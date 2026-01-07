const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") 
    .replace(/^-+|-+$/g, "");  
};

export default createSlug;