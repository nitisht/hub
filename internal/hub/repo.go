package hub

import (
	"context"

	helmrepo "helm.sh/helm/v3/pkg/repo"
)

// RepositoryKind represents the kind of a given repository.
type RepositoryKind int64

const (
	// Helm represents a repository with Helm charts.
	Helm RepositoryKind = 0

	// Falco represents a repository with Falco rules.
	Falco RepositoryKind = 1

	// OPA represents a repository with OPA policies.
	OPA RepositoryKind = 2

	// OLM represents a repository with OLM operators.
	OLM RepositoryKind = 3
)

// GetKindName returns the name of the provided repository kind.
func GetKindName(kind RepositoryKind) string {
	switch kind {
	case Helm:
		return "helm"
	case Falco:
		return "falco"
	case OPA:
		return "opa"
	case OLM:
		return "olm"
	default:
		return ""
	}
}

// Repository represents a packages repository.
type Repository struct {
	RepositoryID            string         `json:"repository_id"`
	Name                    string         `json:"name"`
	DisplayName             string         `json:"display_name"`
	URL                     string         `json:"url"`
	Kind                    RepositoryKind `json:"kind"`
	UserID                  string         `json:"user_id"`
	UserAlias               string         `json:"user_alias"`
	OrganizationID          string         `json:"organization_id"`
	OrganizationName        string         `json:"organization_name"`
	OrganizationDisplayName string         `json:"organization_display_name"`
}

// RepositoryManager describes the methods an RepositoryManager
// implementation must provide.
type RepositoryManager interface {
	Add(ctx context.Context, orgName string, r *Repository) error
	CheckAvailability(ctx context.Context, resourceKind, value string) (bool, error)
	Delete(ctx context.Context, name string) error
	GetByKind(ctx context.Context, kind RepositoryKind) ([]*Repository, error)
	GetByName(ctx context.Context, name string) (*Repository, error)
	GetPackagesDigest(ctx context.Context, repositoryID string) (map[string]string, error)
	GetOwnedByOrgJSON(ctx context.Context, orgName string) ([]byte, error)
	GetOwnedByUserJSON(ctx context.Context) ([]byte, error)
	SetLastTrackingResults(ctx context.Context, repositoryID, errs string) error
	Transfer(ctx context.Context, name, orgName string) error
	Update(ctx context.Context, r *Repository) error
}

// HelmIndexLoader interface defines the methods a Helm index loader
// implementation should provide.
type HelmIndexLoader interface {
	LoadIndex(r *Repository) (*helmrepo.IndexFile, error)
}

// RepositoryCloner describes the methods a Cloner implementation must provide.
type RepositoryCloner interface {
	// CloneRepository clones the packages repository provided in a temporary
	// dir, returning the temporary directory path and the path where the
	// packages are located. It's the caller's responsibility to delete them
	// temporary dir when done.
	CloneRepository(ctx context.Context, r *Repository) (tmpDir string, packagesPath string, err error)
}
