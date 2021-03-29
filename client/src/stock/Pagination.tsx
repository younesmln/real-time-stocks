import React from 'react';

type Props = {
  page: number;
  count: number;
  perPage: number;
  getPage: (page: number) => void;
};

function Pagination({ page, count, perPage, getPage }: Props) {
  const pageEndCount = page * perPage;
  const pageStartCount = page * perPage + 1 - perPage;

  const isPreviousDisabled = page < 2;
  const isNextDisabled = page * perPage > count;

  const buttonClassName = (isDisabled: boolean) =>
    `relative inline-flex items-center px-4 py-2 mx-2 border border-gray-300 text-sm font-medium rounded-md bg-white ${
      isDisabled ? 'text-gray-300' : 'text-gray-700 hover:text-gray-500'
    }`;

  return (
    <div className="w-full bg-white px-4 py-3 my-5 mx-6 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div>
        <p className="text-sm text-gray-700" data-testid="pagination-result">
          Showing
          <span className="font-medium"> {pageStartCount} </span>
          to
          <span className="font-medium"> {pageEndCount} </span>
          of
          <span className="font-medium"> {count} </span>
          results
        </p>
      </div>
      <div className="flex-1 flex justify-end">
        <button
          className={buttonClassName(isPreviousDisabled)}
          onClick={() => getPage(page - 1)}
          disabled={isPreviousDisabled}
        >
          Previous
        </button>
        <button
          className={buttonClassName(isNextDisabled)}
          onClick={() => getPage(page + 1)}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default React.memo(Pagination);
