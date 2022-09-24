import React from 'react';

function Breadcrumb(props) {

  function isLast(index) {
    return index === props.crumbs.length - 1;
  }

  return (
    <div className="row justify-content-center mt-4">
      <ol className="breadcrumb">
        {
          props.crumbs.map((crumb, ci) => {
            const disabled = isLast(ci) ? 'disabled' : '';
            
            return (
              <li
                key={ ci }
                className="breadcrumb-item align-items-center"
              >
                <button className={ `btn btn-link ${ disabled }` } onClick={ () => props.selected(crumb) }>
                  { crumb }
                </button>
              </li>
            );
          })
        }
      </ol>
    </div>
  );
}

export default Breadcrumb;