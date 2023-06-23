// react function component RuleTypeIcon

import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Bookmark, BookmarkStar } from 'react-bootstrap-icons';
import { RuleType } from '../constants';

export function RuleTypeIcon({ type }) {
  // give tooltip to both icons
  const tooltip = (
    <Tooltip id="tooltip">
      {type === RuleType.SIMPLE ? 'Simple Rule' : 'Smart Parameter Rule'}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="left" overlay={tooltip}>
      {type === RuleType.SIMPLE ? (
        <Bookmark size={16} />
      ) : (
        <BookmarkStar size={16} />
      )}
    </OverlayTrigger>
  );
}
