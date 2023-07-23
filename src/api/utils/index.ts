interface Data {
  [key: string]: any;
}

export const convertFormDataToObject = (data: Data): Data => {
  const result: Data = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      const keyParts = key.split(".");
      const arrayRegex = /(.+)\[(\d+)\]/;
      let current = result;
      for (let i = 0; i < keyParts.length; i++) {
        const arrayMatch = keyParts[i].match(arrayRegex);
        if (arrayMatch) {
          const arrayKey = arrayMatch[1];
          const arrayIndex = arrayMatch[2];
          if (!current[arrayKey]) {
            current[arrayKey] = [];
          }
          if (i === keyParts.length - 1) {
            current[arrayKey][arrayIndex] = value;
          } else {
            if (!current[arrayKey][arrayIndex]) {
              current[arrayKey][arrayIndex] = {};
            }
            current = current[arrayKey][arrayIndex];
          }
        } else {
          if (i === keyParts.length - 1) {
            current[keyParts[i]] = value;
          } else {
            if (!current[keyParts[i]]) {
              current[keyParts[i]] = {};
            }
            current = current[keyParts[i]];
          }
        }
      }
    }
  }
  return result;
};

export const generateTimeSlots = () => {
  const timeSlots = [];
  let startTime = new Date();
  startTime.setHours(9, 0, 0, 0);

  const endTime = new Date();
  endTime.setHours(21, 0, 0, 0);

  while (startTime < endTime) {
    const startHour = startTime.getHours().toString().padStart(2, "0");
    const startMinute = startTime.getMinutes().toString().padStart(2, "0");

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);
    const endHour = endTime.getHours().toString().padStart(2, "0");
    const endMinute = endTime.getMinutes().toString().padStart(2, "0");

    const timeSlot = `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
    timeSlots.push(timeSlot);

    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  return timeSlots;
};
