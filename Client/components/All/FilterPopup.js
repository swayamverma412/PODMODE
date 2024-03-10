import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const FilterPopup = ({ onClose }) => {
  const { filter, setFilter } = useGlobalAgentContext();
  return (
    <div className="flex flex-col items-center justify-center gap-8  py-8  w-[300px] bg-white drop-shadow rounded-standard dark:bg-bgBlack">
      <div className="flex items-start justify-between w-full px-8">
        <p className="text-lg font-bold tracking-wide">{t("Agents_filter")}</p>
        <button
          onClick={() => {
            setFilter({
              status: {
                isActive: false,
                isNotActive: false,
              },
              service: {
                isEnabled: false,
                isDisabled: false,
              },
            });
          }}
          className="outline-0 text-Blue border-b-[1px] border-Blue text-sm font-medium"
        >
          {t("Agents_filter_clearall")}
        </button>
      </div>
      <div className="flex flex-col items-start justify-start w-full gap-4">
        <div className="flex items-center justify-between w-full px-8">
          <p>{t("Agents_filter_status")}</p>
          <button className="text-2xl">
            <BiChevronDown />
          </button>
        </div>
        <div className="flex flex-col items-start justify-center w-full bg-[#5784f71a] px-8 py-5 gap-4">
          <div className="flex items-center gap-3">
            <input
              id="Active"
              type="checkbox"
              checked={filter.status.isActive}
              onChange={() =>
                setFilter({
                  ...filter,
                  status: {
                    ...filter.status,
                    isActive: !filter.status.isActive,
                  },
                })
              }
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="Active" className="font-medium">
              {t("Agents_filter_active")}
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              id="NotActive"
              type="checkbox"
              checked={filter.status.isNotActive}
              onChange={() =>
                setFilter({
                  ...filter,
                  status: {
                    ...filter.status,
                    isNotActive: !filter.status.isNotActive,
                  },
                })
              }
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="NotActive" className="font-medium">
              {t("Agents_filter_notactive")}
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start w-full gap-4">
        <div className="flex items-center justify-between w-full px-8">
          <p>{t("Agents_filter_service")}</p>
          <button className="text-2xl">
            <BiChevronDown />
          </button>
        </div>
        <div className="flex flex-col items-start justify-center w-full bg-[#5784f71a] px-8 py-5 gap-4">
          <div className="flex items-center gap-3">
            <input
              id="enabled"
              type="checkbox"
              checked={filter.service.isEnabled}
              onChange={() =>
                setFilter({
                  ...filter,
                  service: {
                    ...filter.service,
                    isEnabled: !filter.service.isEnabled,
                  },
                })
              }
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="enabled" className="font-medium">
              {t("Agents_filter_enabled")}
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              id="Disabled"
              type="checkbox"
              checked={filter.service.isDisabled}
              onChange={() =>
                setFilter({
                  ...filter,
                  service: {
                    ...filter.service,
                    isDisabled: !filter.service.isDisabled,
                  },
                })
              }
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="Disabled" className="font-medium">
              {t("Agents_filter_disabled")}
            </label>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-4 px-8">
        <button handleClick={onClose} text={t("cancel")} />
        <button handleClick={onClose} text={t("Agents_filter_apply")} />
      </div>
    </div>
  );
};

export default FilterPopup;
