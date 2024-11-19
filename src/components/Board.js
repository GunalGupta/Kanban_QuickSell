import React from 'react';
import Column from './Column';
import '../css/Board.css';

const Board = ({ tickets, users, grouping, sorting }) => {
  const getPriorityName = (priority) => {
    const priorities = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority'
    };
    return priorities[priority];
  };

  const groupTickets = () => {
    let groups = {};

    if (grouping === 'status') {
      groups = {
        'Todo': [],
        'In progress': [],
        'Backlog': [],
        'Done': []
      };
      tickets.forEach(ticket => {
        if (!groups[ticket.status]) groups[ticket.status] = [];
        groups[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        groups[user.name] = tickets.filter(ticket => ticket.userId === user.id);
      });
    } else if (grouping === 'priority') {
      const priorities = {
        'Urgent': [],
        'High': [],
        'Medium': [],
        'Low': [],
        'No priority': []
      };
      tickets.forEach(ticket => {
        const priorityName = getPriorityName(ticket.priority);
        priorities[priorityName].push(ticket);
      });
      groups = priorities;
    }

    // Sort tickets within each group
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groups;
  };

  const groups = groupTickets();

  return (
    <div className="board-container">
      <div className="board">
        {Object.entries(groups).map(([groupName, groupTickets]) => (
          <Column 
            key={groupName}
            title={groupName}
            tickets={groupTickets}
            users={users}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
