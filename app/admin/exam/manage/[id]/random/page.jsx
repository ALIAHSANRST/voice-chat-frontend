'use client'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  useCallback,
  useEffect,
  useState
} from 'react';
import { useParams } from 'next/navigation';

import AdminLayout from '../../../../layout';
import {
  ADMIN_COMPONENTS,
  COMMON_COMPONENTS
} from '@/src/components';
import { ADMIN_CONSTANTS } from '@/src/utils/constants';
import { GetRandomExam } from './axios';
import { usePageTitle } from '@/src/hooks';
import { ROUTES } from '@/src/utils/routes';

/**
 * RandomExamPage Component
 * 
 * Displays randomly generated exam sentences based on exam configuration.
 * Shows exam info, sentence list, and generation stats for admins.
 * 
 * Features:
 * - Displays exam info (name, description, marks, limits)
 * - Shows randomly selected sentences meeting word/sentence limits
 * - Provides stats about content availability and generation
 * - Loading states and error handling
 * - Navigation back to exam list
 */
const RandomExamPage = () => {
  // set page title
  usePageTitle({
    title: [
      ROUTES.ADMIN_EXAM_MANAGE_RANDOM.name,
      ADMIN_CONSTANTS.MODULE_TITLE
    ]
  });

  // get id from params
  const { id } = useParams();

  // state management
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    await GetRandomExam({ setIsLoading, setData, id, setError });
  }, []);

  // fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <ADMIN_COMPONENTS.ContentWrapper>
        <COMMON_COMPONENTS.Loader wrapped={true} message='Loading Data...' />
      </ADMIN_COMPONENTS.ContentWrapper>
    );
  }

  if (error) {
    return (
      <ADMIN_COMPONENTS.ContentWrapper>
        <ADMIN_COMPONENTS.SomethingWentWrong message={error} />
      </ADMIN_COMPONENTS.ContentWrapper>
    );
  }

  return (
    <ADMIN_COMPONENTS.ContentWrapper outerOnly={true}>
      <ADMIN_COMPONENTS.ContentWrapper innerOnly={true} className='mb-3'>
        <ADMIN_COMPONENTS.DataTable.Header
          title={`Random - ${data?.exam?.info?.name}`}
          actions={[
            {
              href: ROUTES.ADMIN_EXAM_MANAGE.path,
              label: 'Back',
              icon: faArrowLeft,
              variant: 'outline-secondary'
            },
          ]}
        />

        {/* Exam Stats */}
        <div className="mb-4">
          <h5 className="mb-3">Generation Stats</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Available {data?.stats?.type}</h6>
                  <h4 className="card-title mb-0">{data?.stats?.available}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Minimum Required</h6>
                  <h4 className="card-title mb-0">{data?.stats?.minimum_required}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Generated {data?.stats?.type}</h6>
                  <h4 className="card-title mb-0">{data?.stats?.actual_generated}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Total Sentences</h6>
                  <h4 className="card-title mb-0">{data?.exam?.total_sentences}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Info */}
        <div>
          <h5 className="mb-3">Exam Information</h5>
          <div className="card">
            <div className="card-body">
              <div className="row mb-3 g-2">
                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                  <strong className="me-2">Total Marks:</strong>
                  {data?.exam?.info?.total_marks}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                  <strong className="me-2">{data?.exam?.info?.word_limit ? 'Word' : 'Sentence'} Limit:</strong>
                  {data?.exam?.info?.word_limit || data?.exam?.info?.sentence_limit}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <strong className="me-2">Complexity Levels:</strong>
                  {data?.exam?.info?.complexity_levels.map((level, index) => (
                    <span key={index} className={`badge me-2 ${level === 'Easy' ? 'bg-success' :
                      level === 'Medium' ? 'bg-dark' :
                        'bg-danger'
                      }`}>{level}</span>
                  ))}
                </div>
              </div>
              <div>
                <strong>Description:</strong>
                {data?.exam?.info?.description ? (
                  <p className="mb-0">{data?.exam?.info?.description}</p>
                ) : (
                  <p className="mb-0 text-muted">No Description Available!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </ADMIN_COMPONENTS.ContentWrapper>

      <ADMIN_COMPONENTS.ContentWrapper innerOnly={true} className='mb-3'>
        {/* Sentences */}
        <div>
          <h5 className="mb-3">Generated Content</h5>
          <div className="d-flex flex-wrap gap-2">
            {data?.exam?.sentences.map((sentence, index) => (
              <span
                key={sentence._id}
                title={sentence.complexity_level}
                className={`${sentence.complexity_level === 'Easy' ? 'bg-success-subtle' :
                  sentence.complexity_level === 'Medium' ? 'bg-warning-subtle' :
                    'bg-danger-subtle'
                  } px-2 py-1 rounded`}
              >{sentence.text}</span>
            ))}
          </div>
        </div>
      </ADMIN_COMPONENTS.ContentWrapper>

      <ADMIN_COMPONENTS.ContentWrapper innerOnly={true} className='mb-3'>
        {/* Rubrics */}
        <div>
          <h5 className="mb-3">Rubrics Levels</h5>
          <div className="table-responsive">
            <table className="table table-bordered mb-0 table-striped">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Description</th>
                  <th>Range</th>
                </tr>
              </thead>
              <tbody>
                {data?.exam?.info?.rubrics_levels.map((rubric, index) => (
                  <tr key={index}>
                    <td style={{ width: "15%" }}>{rubric.level_name}</td>
                    <td>{rubric.level_description}</td>
                    <td style={{ width: "15%" }}>
                      {rubric.lower_percentage}% - {rubric.upper_percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ADMIN_COMPONENTS.ContentWrapper>
    </ADMIN_COMPONENTS.ContentWrapper>
  );
};

RandomExamPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default RandomExamPage;