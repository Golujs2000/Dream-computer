import React, { useState, useEffect } from 'react';
import { Check, AlertCircle } from 'lucide-react';

/**
 * Dynamic Product Variations Engine
 * Supports unlimited configurable attributes:
 * e.g. RAM, Storage, GPU, Processor, Color
 */
export const ProductVariantSelector = ({
  product,
  selectedVariant,
  onVariantChange,
}) => {
  if (!product.hasVariants || !product.variants || product.variants.length === 0) {
    return null;
  }

  // Extract all attribute keys configured on this product's variants
  const attributeKeys = Object.keys(product.variants[0]?.attributes || {});

  // Current selected attribute state
  const currentAttributes = selectedVariant?.attributes || product.variants[0]?.attributes || {};

  // Find all unique options for each attribute key in available variants
  const getOptionsForAttribute = (attrKey) => {
    const values = new Set();
    product.variants.forEach((v) => {
      if (v.attributes && v.attributes[attrKey]) {
        values.add(v.attributes[attrKey]);
      }
    });
    return Array.from(values);
  };

  const handleOptionSelect = (attrKey, value) => {
    const candidateAttributes = {
      ...currentAttributes,
      [attrKey]: value,
    };

    // Find the closest or exact matching variant
    // 1. Look for exact match
    let match = product.variants.find((v) =>
      Object.entries(candidateAttributes).every(([k, val]) => v.attributes?.[k] === val)
    );

    // 2. If exact combination does not exist, find a variant that has the clicked value
    if (!match) {
      match = product.variants.find((v) => v.attributes?.[attrKey] === value);
    }

    if (match) {
      onVariantChange(match);
    }
  };

  return (
    <div className="space-y-4 py-3 border-y border-[#303746]/60">
      {attributeKeys.map((attrKey) => {
        const options = getOptionsForAttribute(attrKey);
        const selectedValue = currentAttributes[attrKey];

        return (
          <div key={attrKey}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-rajdhani font-bold uppercase text-[#B7BBC5] tracking-wider">
                Select {attrKey}:
              </span>
              <span className="text-[#BEF8A1] font-semibold">{selectedValue}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {options.map((opt) => {
                const isSelected = selectedValue === opt;
                // Check if this option has stock in any variant
                const matchingVariants = product.variants.filter((v) => v.attributes?.[attrKey] === opt);
                const isAvailable = matchingVariants.some((v) => (v.stock || 0) > 0);

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleOptionSelect(attrKey, opt)}
                    className={`px-3 py-2 text-xs font-rajdhani font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#191F2D] border-[#BEF8A1] text-[#BEF8A1] shadow-glow-subtle'
                        : isAvailable
                        ? 'bg-[#0A101E] border-[#303746] text-[#B7BBC5] hover:border-[#8B929E] hover:text-[#F5F5F7]'
                        : 'bg-[#0A101E]/50 border-red-900/40 text-[#8B929E]/60 line-through'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Selected SKU info */}
      <div className="text-[11px] text-[#8B929E] flex items-center justify-between pt-1">
        <span>Active Configuration SKU:</span>
        <span className="font-mono text-[#F5F5F7] bg-[#0A101E] px-2 py-0.5 rounded border border-[#303746]">
          {selectedVariant?.sku || product.sku}
        </span>
      </div>
    </div>
  );
};
