import React from 'react';

export const ProductSpecsTable = ({ specifications = {} }) => {
  const entries = Object.entries(specifications || {});

  if (entries.length === 0) {
    return (
      <p className="text-sm text-[#8B929E] italic">
        Full technical specifications sheet available on request at our Patna showroom.
      </p>
    );
  }

  return (
    <div className="border border-[#303746] rounded-xl overflow-hidden bg-[#121826]">
      <table className="w-full text-left text-sm">
        <tbody>
          {entries.map(([key, val], idx) => (
            <tr
              key={key}
              className={`border-b border-[#303746]/50 last:border-b-0 ${
                idx % 2 === 0 ? 'bg-[#121826]' : 'bg-[#191F2D]'
              }`}
            >
              <td className="py-3 px-4 w-1/3 font-semibold text-[#B7BBC5] font-rajdhani uppercase text-xs">
                {key}
              </td>
              <td className="py-3 px-4 font-inter text-[#F5F5F7] text-xs sm:text-sm">
                {val}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
