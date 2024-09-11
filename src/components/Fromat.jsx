import React from 'react';

const TodayDateInArabic = () => {
  // Get today's date
  const today = new Date();

  // Format the date in Arabic
  const formattedDate = today.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default TodayDateInArabic;
