import React, { Key } from 'react';
import { Trash, Bookmark } from "react-feather";
import PropTypes from 'prop-types';

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import './WithOneAction.css';
import clsx from 'clsx';

Cards.propTypes = {
  setStatus: PropTypes.func.isRequired,
  threshold: PropTypes.number.isRequired,
  setThreshold: PropTypes.func.isRequired,
  setSwipeProgress: PropTypes.func.isRequired,
  setSwipeAction: PropTypes.func.isRequired,
  setTriggeredItemAction: PropTypes.func.isRequired,
};

//EXAMPLE DATA
// [
//     {
//       "id": "845d8198-7089-4618-891b-47a2b5038c83",
//       "listName": "new list",
//       "createdAt": "2023-03-03T17:55:28.892Z",
//       "userIdentifier": "3c34daba-20e9-4a99-b3fb-204406a63c37"
//     }
//   ]

type listProps = {
  listId: string | number
  listName: string
  dateCreated: Date //check format
  itemsTotal: Number
  itemsChecked: Number
  favorite: boolean
}

type userList = {
  id: string
  name: string
  createdAt: string
  userIdentifier: string
  favorite?: boolean
}

type userLists = Array<userList>

//how to link
const lists: userLists = [] as userLists

const Cards = ({
  setStatus,
  threshold,
  setThreshold,
  setSwipeProgress,
  setSwipeAction,
  setTriggeredItemAction,
}) => {
  React.useEffect(() => {
    setThreshold(0.3);
  }, [setThreshold]);

  const handleSwipeStart = () => {
    setSwipeAction('Swipe started');
    setTriggeredItemAction('None');
  };

  const handleSwipeEnd = () => {
    setSwipeAction('Swipe ended');
    setSwipeProgress();
  };

  const handleDelete = (id: string) => () => {
    console.log('[Handle DELETE]', id);
    setTriggeredItemAction(`[Handle ACCEPT] - ${id}`);
    setStatus(id, 'accepted');
  };

  const handlePin = (id: string) => () => {
    console.log('[Handle PIN]', id);
    setTriggeredItemAction(`[Handle PIN] - ${id}`);
  };


  const leadingActions = (id: string) => (
    <LeadingActions>
        <SwipeAction onClick={handlePin(id)}>
          <div className="bg-primary-default-Solid place-items-center">
            <div className="flex gap-[30px]">
              <span className="h-6 w-6">
                <Bookmark />
              </span>
              <p className="bg-white text-primary">Pin</p>
            </div>
          </div>
        </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id: string) => (
    <TrailingActions>
        <SwipeAction destructive={true} onClick={handleDelete(id)}>
          <div className="bg-ux-error place-items-center">
            <div className="flex gap-[30px]">
              <span className="h-6 w-6">
                <Trash />
              </span>
              <p className="bg-white text-primary">Pin</p>
            </div>
          </div>
        </SwipeAction>
    </TrailingActions>
  );

  //list: Object to be added
  //without the just created list
  //color definition for Bookmark missing
  //chech Date type, Date to be converted
  return (
    <>
      <div className="basic-swipeable-list__container">
        <SwipeableList
          threshold={threshold}
          type={ListType.MS}
          className="absolute bottom-[30px] h-full mt-[160px] flex flex-col gap-3 overflow-hidden"
        >
          {lists.map(({ id, name, createdAt }) => (
            <SwipeableListItem
              key={id as Key}
              leadingActions={leadingActions(id)}
              trailingActions={trailingActions(id)}
              onSwipeEnd={handleSwipeEnd}
              onSwipeProgress={setSwipeProgress}
              onSwipeStart={handleSwipeStart}
            >
              <div className='flex flex-col gap-[10px] p-[10px]'>
                <p className='button-bold text-primary-default-Solid'> {`${itemsChecked}/${itemsTotal}Items`} </p>
                <div className='title text-primary-default-Solid mb-[14px]'>{name}</div>
                <div className='flex justify-between'>
                  <div className={clsx((!favorite&&'hidden'),'text-primary-default-Solid text-primary w-6 h-6')}>Bookmark</div>
                  <p>{createdAt}</p>
                </div>
              </div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>
    </>
  );
};

export default Cards;