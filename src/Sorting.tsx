import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { sortBy } from 'underscore'

interface Props {
  data: any
  incoming: any
}

const Sorting: React.FC<Props> = (props) => {

  const { data, incoming } = props;

  const handleSort = () => {
    let sorted = sortBy(data, 'deadline')
    incoming(sorted);
  }

  return (
    <div >
      <Button onClick={() => handleSort()}>Sort By Deadline</Button>
    </div>
  );
}

export default Sorting;
