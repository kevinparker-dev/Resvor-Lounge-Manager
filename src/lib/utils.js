import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-()]+$/;
  return re.test(phone);
};

// Local storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
};

// Date formatting utilities
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateWithName = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export const formatDateTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleString("en-US");
};

export const formatTime = (isoString, format) => {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) return { error: "Invalid ISO date" };

  const pad = (num) => String(num).padStart(2, "0");

  // 24-hour format
  const hours24 = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const time24 = `${hours24}:${minutes}`;

  // 12-hour format
  const hours12 = pad(date.getHours() % 12 || 12);
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const time12 = `${hours12}:${minutes} ${ampm}`;

  return format === "12" ? time12 : time24;
};

// String utilities
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str, length = 50) => {
  if (!str) return "";
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

// Number utilities
export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const formatPercentage = (num, fractionDigits = 2) => {
  return num
    ? num > 0
      ? `+${num?.toFixed(fractionDigits)}%`
      : `${num?.toFixed(fractionDigits)}%`
    : "0%";
};

export const handleError = (error, customMessage) => {
  console.log(error);
  toast.error(
    error?.message ||
      error?.response?.data?.message ||
      customMessage ||
      "Something went wrong"
  );
};

export const handleSuccess = (message, customMessage) => {
  toast.success(message || customMessage || "Operation successful");
};

const utils = {
  validateEmail,
  validatePhone,
  storage,
  formatDate,
  formatDateWithName,
  formatDateTime,
  formatTime,
  capitalize,
  truncate,
  formatCurrency,
  formatNumber,
  formatPercentage,
  handleError,
  handleSuccess,
};

export default utils;
