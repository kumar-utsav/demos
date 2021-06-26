function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const driver = (val) => {
  console.log(val);
};

const debounced = debounce(driver, 1000);
debounced(1);
