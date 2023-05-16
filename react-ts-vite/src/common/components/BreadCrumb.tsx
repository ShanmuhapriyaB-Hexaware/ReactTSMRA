import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type IProps = {
  breadCrumbData: IbreadCrumbData[];
};

type IbreadCrumbData = {
  label: string;
  url: string;
};

const StyledIcon = styled(HomeIcon)(() => ({
  marginBottom: '4px',
  verticalAlign: 'middle',
}));
const LabelName = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

function BreadCrumb({ breadCrumbData }: IProps) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <NavLink to="/">
        <StyledIcon color="primary">home</StyledIcon>
      </NavLink>
      {breadCrumbData.map((breadCrumb: IbreadCrumbData, index: number) => (
        <div>
          {breadCrumb.url !== '' && (
            <NavLink style={{ textDecoration: 'none' }} key={index} to={breadCrumb.url}>
              <LabelName>{breadCrumb.label}</LabelName>
            </NavLink>
          )}
          {breadCrumb.url === '' && <Typography>{breadCrumb.label}</Typography>}
        </div>
      ))}
    </Breadcrumbs>
  );
}

export default BreadCrumb;
