import React from 'react';
import '../css/Card.css';

const Card = ({ ticket, user }) => {
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 4: return '🔴'; // Urgent
      case 3: return '🟡'; // High
      case 2: return '🟠'; // Medium
      case 1: return '🔵'; // Low
      default: return '⚪'; // No priority
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-info">
          <div className="user-avatar">
            {user?.name.charAt(0)}
            <span className={`status-dot ${user?.available ? 'available' : ''}`}></span>
          </div>
        </div>
      </div>
      <div className="card-title">
        {ticket.title}
      </div>
      <div className="card-footer">
        <span className="priority-icon">{getPriorityIcon(ticket.priority)}</span>
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;