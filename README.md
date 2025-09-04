# Expense Tracker

A clean, offline-first expense tracking application built with React Native and TypeScript.

## Features

- **Offline-First:** All data is stored locally on your device using AsyncStorage.
- **CRUD Operations:** Seamlessly add, view, edit, and delete expenses.
- **Interactive List:** Sort expenses by date, category, or amount.
- **Spending Analytics:** Visualize your spending habits with a category-based pie chart.
- **Budgeting:** Set a monthly spending limit and receive alerts when you exceed it.
- **Custom Categories:** Add your own spending categories on the fly.
- **Theme Aware:** A sleek, theme-aware UI with a manual dark mode toggle for comfortable viewing.

## Tech Stack

- **React Native & TypeScript**
- **Zustand** for global state management
- **TanStack Query (React Query)** for asynchronous operations
- **React Navigation** for routing
- **Reanimated 2 & Gesture Handler** for animations
- **twrnc** for Tailwind CSS styling

## Getting Started

Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

Install dependencies:

```bash
yarn install
```

Install iOS Pods:

```bash
cd ios && pod install
```

## Running the App

To run on iOS:

```bash
yarn ios
```

To run on Android:

```bash
yarn android
```
